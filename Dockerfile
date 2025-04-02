FROM node:18-alpine

# Cài đặt Java (OpenJDK) và các công cụ cần thiết
RUN apk add --no-cache openjdk17-jdk curl unzip bash

# Xác định chính xác đường dẫn JAVA_HOME trên Alpine
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Kiểm tra Java
RUN java -version

# Tạo thư mục ứng dụng và thiết lập quyền
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Sao chép package.json và package-lock.json trước
COPY --chown=node:node package*.json ./

# Chuyển sang người dùng node
USER node

# Cài đặt các dependencies
RUN npm install --production

# Sao chép mã nguồn vào container
COPY --chown=node:node . .

# Quay lại quyền root để cài đặt sonar-scanner
USER root

# Cài đặt Sonar Scanner CLI (bỏ JRE đi kèm)
RUN curl -o /tmp/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip && \
    unzip /tmp/sonar-scanner.zip -d /opt/ && \
    ln -s /opt/sonar-scanner-5.0.1.3006-linux/bin/sonar-scanner /usr/local/bin/sonar-scanner && \
    rm /tmp/sonar-scanner.zip && \
    sed -i 's|use_embedded_jre=true|use_embedded_jre=false|' /opt/sonar-scanner-5.0.1.3006-linux/bin/sonar-scanner && \
    rm -rf /opt/sonar-scanner-5.0.1.3006-linux/jre  # Xóa JRE của Sonar Scanner

# Kiểm tra Sonar Scanner
RUN sonar-scanner --version

# Trở lại người dùng node
USER node

# Chạy ứng dụng
CMD ["node", "src/server.js"]
