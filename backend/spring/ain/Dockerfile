FROM openjdk:17-jdk
EXPOSE 8080
COPY ./build/libs/*.jar ain-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "ain-0.0.1-SNAPSHOT.jar"]