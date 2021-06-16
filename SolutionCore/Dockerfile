#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup


WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
# Setup NodeJs
RUN apt-get -qq update && \
    apt-get -qq install -y wget && \
    apt-get -qq install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get -qq install -y build-essential nodejs && \
    apt-get -qq install -y nginx
# End setup


WORKDIR /src
COPY ["SolutionCore/SolutionCore.csproj", "SolutionCore/"]
COPY ["Application/SolutionCore.Application.Contracts/SolutionCore.Application.Contracts.csproj", "Application/SolutionCore.Application.Contracts/"]
COPY ["Infrastructure/Transport/SolutionCore.Infraestructura.Transport/SolutionCore.Infraestructura.Transport.csproj", "Infrastructure/Transport/SolutionCore.Infraestructura.Transport/"]
COPY ["Application/SolutionCore.Application/SolutionCore.Application.csproj", "Application/SolutionCore.Application/"]
COPY ["Data Acces/SolutionCore.Api.DataAcces/SolutionCore.Api.DataAcces.csproj", "Data Acces/SolutionCore.Api.DataAcces/"]
RUN dotnet restore "SolutionCore/SolutionCore.csproj"
COPY ["SolutionCore/ClientApp/package.json", "SolutionCore/ClientApp/"]

RUN cd src/SolutionCore/ClientApp \
    && npm i --silent


COPY . .
WORKDIR "/src/SolutionCore"
RUN dotnet build "SolutionCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SolutionCore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SolutionCore.dll"]