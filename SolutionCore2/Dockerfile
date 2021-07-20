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
COPY ["SolutionCore2/SolutionCore.csproj", "SolutionCore2/"]
RUN dotnet restore "SolutionCore2/SolutionCore.csproj"

#an
COPY ["SolutionCore2/ClientApp/package.json", "SolutionCore2/ClientApp/"]

RUN cd SolutionCore2/ClientApp \
    && npm i --silent
#an

COPY . .
WORKDIR "/src/SolutionCore2"
RUN dotnet build "SolutionCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SolutionCore.csproj" -c Release -o /app

 

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

RUN mkdir -p /app/dist
COPY --from=nodebuilder /usr/src/app/dist/. /app/ClientApp/dist/
RUN ls /app/ClientApp/dist


ENTRYPOINT ["dotnet", "SolutionCore.dll"]
