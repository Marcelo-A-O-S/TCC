using Api.Context;
using Api.Generics;
using Api.Generics.Interfaces;
using Api.Models;
using Api.Repositories;
using Api.Repositories.Interfaces;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo()
    {
        Title = "TCC",
        Version = "v1",
        Description = "Api feita gerenciamento de dados de uma aplicação.",
        Contact = new OpenApiContact()
        {

            Email = "marceloaugustooliveirasoares@gmail.com",
            Name = "Marcelo Augusto de Oliveira Soares"
        }
    });
    options.AddSecurityDefinition("Authentication", new OpenApiSecurityScheme()
    {
        Description = "Para realizar testes de autenticação na api",
        Name = "Autenticação",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("JwtKey:Key").Value))
        };
/*         options.Events = new JwtBearerEvents{
            OnMessageReceived = context =>{
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && 
                path.StartsWithSegments("/notifications"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        }; */
    });
builder.Services.AddDbContext<AppDbContext>(options => 
{
    options.UseMySql(configuration.GetConnectionString("DefaultConnection"), ServerVersion.Parse("8.0.32-mysql"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
}
);
//Servi�os
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IInitializeUsers, InitializeUsers>();
builder.Services.AddScoped<IPostServices, PostServices>();
builder.Services.AddScoped<IAnswerServices, AnswerServices>();
builder.Services.AddScoped<ICommentServices, CommentServices>();
builder.Services.AddScoped<IJwtBearerServices, JwtBearerServices>();
builder.Services.AddScoped<IImageServices, ImageServices>();
builder.Services.AddScoped<ILikeServices, LikeServices>();
builder.Services.AddScoped<INotificationServices, NotificationServices>();
//Repositorios
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnswerRepository, AnswerRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

//Utilitários
builder.Services.AddScoped<IGenerics<User>, Generics<User>>();
builder.Services.AddSignalR();

var app = builder.Build();
InitializeProgram(app);
app.UseWebSockets();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<NotificationHubService>("/notifications");
app.Run();
async Task InitializeProgram(WebApplication web)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var initializeUser = scope.ServiceProvider.GetService<IInitializeUsers>();
        if (initializeUser != null)
        {
            await initializeUser.createUsers();
        }


    }
}