FROM openjdk:17-jdk-slim

WORKDIR /app

# Gradle 설치
RUN apt-get update && apt-get install -y gradle

# 프로젝트 파일 복사
COPY . .

# 빌드
RUN gradle build

# 실행
CMD ["java", "-jar", "build/libs/*.jar"]

EXPOSE 8080