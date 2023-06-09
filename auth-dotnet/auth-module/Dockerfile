FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

COPY *.csproj .
COPY appsettings.json ./

RUN dotnet restore

COPY . .

VOLUME /app

EXPOSE 5097

CMD ["dotnet", "watch"]