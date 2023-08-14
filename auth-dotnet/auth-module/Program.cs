using auth_module.Data;
using auth_module.Data.DTOs;
using auth_module.Services;
using Microsoft.OpenApi.Models;

var myCorsPolicy = "policy";
var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder().SetBasePath(builder.Environment.ContentRootPath).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();

builder.Configuration.AddConfiguration(config);

// Add services to the container.
builder.Services.AddControllers();

//CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: myCorsPolicy, policy =>
  {
    policy.WithOrigins("http://localhost:3000", "https://64ce701edad64a4e932bab54--song-maker-front.netlify.app", "https://song-maker-front.netlify.app", "https://chordgenerator.site")
      .AllowAnyMethod()
      .AllowAnyHeader();
  });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
});

//DbContext 
builder.Services.AddSqlServer<AuthContext>(builder.Configuration.GetConnectionString("AuthDBConnection"));

builder.Services.AddSingleton<EnvironmentVariables>();
builder.Services.AddScoped<UserAccountService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(c =>
    {
      c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    });
}

app.UseHttpsRedirection();

app.UseCors(myCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
