#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base

WORKDIR /app
EXPOSE 80


## docker angular ********************
#FROM node:alpine AS builder
#COPY web_core/ClientApp .
#WORKDIR /app
##ENV SERVER=52.160.67.118
#RUN npm i
#RUN npm run build --prod
##RUN $(npm bin)/ng build --prod --build-optimizer=false --aot=false
## docker angular ********************


FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
# # Setup NodeJs
# RUN apt-get -qq update && \
#     apt-get -qq install -y wget && \
#     apt-get -qq install -y gnupg2 && \
#     wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
#     apt-get -qq install -y build-essential nodejs && \
#     apt-get -qq install -y nginx
# # End setup
WORKDIR /src
ENV ASPNETCORE_ENVIRONMENT=Production
COPY ["web_core/web_core.csproj", "web_core/"]
# COPY *.sln ./
RUN dotnet restore "web_core/web_core.csproj"
# RUN dotnet restore SolutionCore.sln
COPY . .
WORKDIR "/src/web_core"
RUN dotnet build "web_core.csproj" -c Release -o /app/build

FROM  node:12-alpine as clientBuild
WORKDIR /ClientApp
COPY  web_core/ClientApp/package.json .
RUN npm install 
COPY ["web_core/ClientApp" , "."]
RUN npm run build  --prod


FROM nginx:1.17.1-alpine as prodStage
COPY --from=clientBuild /ClientApp/dist  usr/share/nginx/html

FROM build AS publish
RUN dotnet publish "web_core.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=clientBuild ./ClientApp/dist ./ClientApp/dist
ENTRYPOINT ["dotnet", "web_core.dll"]




## docker angular ********************
##FROM nginx:alpine
#COPY --from=builder /app/dist /app/dist
## docker angular ********************

