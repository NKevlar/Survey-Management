FROM openjdk:17

COPY /ROOT.war app.war

EXPOSE 8080

CMD ["java","-jar","app.war"]