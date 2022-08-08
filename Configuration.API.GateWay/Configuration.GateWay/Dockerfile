#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1-alpine AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /api
COPY ["Configuration.API.GateWay/Configuration.GateWay/Configuration.GateWay.csproj","Configuration.API.GateWay/Configuration.GateWay/"]


RUN dotnet restore "Configuration.API.GateWay/Configuration.GateWay/Configuration.GateWay.csproj"
COPY . .
WORKDIR "/api"
RUN dotnet build "Configuration.API.GateWay/Configuration.GateWay/Configuration.GateWay.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Configuration.API.GateWay/Configuration.GateWay/Configuration.GateWay.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Configuration.GateWay.dll"]
