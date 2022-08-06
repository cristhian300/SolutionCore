#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
# Instalar nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app
EXPOSE 80


#FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster  AS build
WORKDIR /src
COPY ["web_core/web_core.csproj", "web_core/"]
RUN dotnet restore "web_core/web_core.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "web_core/web_core.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "web_core/web_core.csproj" -c Release -o /app/publish 
##################################################################

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "web_core.dll"]
