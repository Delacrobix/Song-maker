FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
# ENV DOTNET_USE_POLLING_FILE_WATCHER 1

WORKDIR /app

COPY *.csproj ./
# COPY appsettings.json ./

RUN dotnet restore
# RUN dotnet dev-certs https --trust

COPY . ./
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /app
EXPOSE 80
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "auth-module.dll" ]