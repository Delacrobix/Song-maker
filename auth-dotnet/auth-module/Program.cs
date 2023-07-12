using auth_module.Data;
using auth_module.Data.DTOs;
using auth_module.Services;

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
    policy.WithOrigins("http://localhost:3000")
      .AllowAnyMethod()
      .AllowAnyHeader();
  });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//DbContext 
builder.Services.AddSqlServer<AuthContext>(builder.Configuration.GetConnectionString("AuthDBConnection"));

builder.Services.AddSingleton<EnvironmentVariables>();
builder.Services.AddScoped<UserAccountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(myCorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
