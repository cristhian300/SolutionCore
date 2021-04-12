#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["SolutionCore/SolutionCore.csproj", "SolutionCore/"]
COPY ["Application/SolutionCore.Application.Contracts/SolutionCore.Application.Contracts.csproj", "Application/SolutionCore.Application.Contracts/"]
COPY ["SolutionCore/Infrastructure/Transport/SolutionCore.Infraestructura.Transport/SolutionCore.Infraestructura.Transport.csproj", "SolutionCore/Infrastructure/Transport/SolutionCore.Infraestructura.Transport/"]
COPY ["Application/SolutionCore.Application/SolutionCore.Application.csproj", "Application/SolutionCore.Application/"]
COPY ["Data Acces/SolutionCore.Api.DataAcces/SolutionCore.Api.DataAcces.csproj", "Data Acces/SolutionCore.Api.DataAcces/"]
RUN dotnet restore "SolutionCore/SolutionCore.csproj"
COPY . .
WORKDIR "/src/SolutionCore"
RUN dotnet build "SolutionCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SolutionCore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SolutionCore.dll"]
