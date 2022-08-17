#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.


FROM  node:12-alpine as clientBuild
WORKDIR /ClientApp
COPY  web_core/ClientApp/package.json .
RUN npm install
COPY ["web_core/ClientApp" , "."]
RUN npm run build  --prod


FROM nginx:1.17.1-alpine as prodStage
COPY --from=clientBuild /ClientApp/dist  usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]



