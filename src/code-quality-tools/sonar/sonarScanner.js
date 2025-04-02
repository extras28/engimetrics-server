import axios from 'axios';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function sonarScanner(project, repoPath) {
    const sonarHost = process.env.SONAR_HOST || 'http://engimetrics-server-sonar-1:9000';
    const sonarProjectKey = `project_${project.id}`;
    const sonarUsername = process.env.SONAR_USERNAME;
    const sonarPassword = process.env.SONAR_PASSWORD;
    const engimetricsNetwork = 'engimetrics_network';

    try {
        // 🧐 Kiểm tra project có tồn tại không
        const response = await axios.get(`${sonarHost}/api/projects/search`, {
            params: { projects: sonarProjectKey },
            auth: { username: sonarUsername, password: sonarPassword },
        });

        if (response.data.components.length === 0) {
            // 🔨 Nếu project chưa tồn tại, tạo mới
            await axios.post(
                `${sonarHost}/api/projects/create`,
                new URLSearchParams({ project: sonarProjectKey, name: project.name }),
                { auth: { username: sonarUsername, password: sonarPassword } }
            );
            console.log(`✅ SonarQube project ${project.name} created successfully.`);
        } else {
            console.log(`🔍 SonarQube project ${project.name} already exists.`);
        }

        // 🛠️ Lấy token tạm thời cho user để quét project
        console.log(`🔑 Lấy token cho user ${sonarUsername}...`);
        const tokenResponse = await axios.post(
            `${sonarHost}/api/user_tokens/generate`,
            new URLSearchParams({ name: `token-${Date.now()}`, type: 'GLOBAL_ANALYSIS_TOKEN' }),
            { auth: { username: sonarUsername, password: sonarPassword } }
        );
        const sonarToken = tokenResponse.data.token;

        console.log(`🚀 Đang chạy Sonar Scanner cho project: ${project.name}...`);

        // 🚀 Gọi container sonar-scanner để quét project
        const scanCommand = `
             cd ${repoPath} && sonar-scanner \
            -Dsonar.host.url=${sonarHost} \
            -Dsonar.token=${sonarToken} \
            -Dsonar.projectKey=${sonarProjectKey} \
            -Dsonar.sources=.
        `;

        // Chạy lệnh quét trong container `sonar-scanner`
        const { stdout, stderr } = await execPromise(scanCommand);
        console.log(`📊 Sonar Scanner Output:\n${stdout}`);
        if (stderr) console.error(`⚠️ Sonar Scanner Errors:\n${stderr}`);

        let analysisStatus = 'PENDING';
        const maxTimeout = 60000; // Thời gian tối đa để chờ (60 giây)
        const startTime = Date.now();

        while (analysisStatus !== 'SUCCESS' && analysisStatus !== 'FAILED') {
            // Kiểm tra nếu đã hết thời gian chờ
            if (Date.now() - startTime > maxTimeout) {
                console.log('⏳ Timeout: Quá thời gian chờ SonarQube phân tích!');
                break;
            }

            await new Promise((resolve) => setTimeout(resolve, 5000)); // Đợi 5 giây

            try {
                const analysisResponse = await axios.get(`${sonarHost}/api/ce/component`, {
                    params: { component: sonarProjectKey },
                    auth: { username: sonarUsername, password: sonarPassword },
                    timeout: 5000, // Timeout cho request API (5 giây)
                });

                analysisStatus = analysisResponse.data?.current?.status || 'PENDING';
                console.log(`📈 SonarQube analysis status: ${analysisStatus}`);
            } catch (error) {
                console.error('🚨 Lỗi khi gọi API SonarQube:', error.message);
                break; // Thoát nếu API lỗi liên tục
            }
        }

        if (analysisStatus === 'FAILED') {
            throw new Error(`❌ SonarQube analysis failed for ${project.name}.`);
        }

        // 📊 Lấy kết quả quét
        const scanResults = await axios.get(`${sonarHost}/api/issues/search`, {
            params: { componentKeys: sonarProjectKey },
            auth: { username: sonarUsername, password: sonarPassword },
        });

        console.log(`✅ SonarQube analysis completed for ${project.name}.`);

        return scanResults.data;
    } catch (error) {
        console.error(`❌ Lỗi khi quét project ${project.name}:`, error.message);
        throw error;
    }
}
