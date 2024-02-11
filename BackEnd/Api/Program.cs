using Api.Context;
using Api.Generics.Interfaces;
using Api.Models;
using Api.Generics;
using Microsoft.EntityFrameworkCore;
using Api.Repositories.Interfaces;
using Api.Services.Interfaces;
using Api.Services;
using Api.Repositories;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(configuration.GetConnectionString("DefaultConnection"), ServerVersion.Parse("8.0.32-mysql")));
//Serviços
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IInitializeUsers, InitializeUsers>();
builder.Services.AddScoped<IPostServices, PostServices>();
builder.Services.AddScoped<IAnswerServices, AnswerServices>();
builder.Services.AddScoped<ICommentServices, CommentServices>();
//Repositorios
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAnswerRepository, AnswerRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();


builder.Services.AddScoped<IGenerics<User>, Generics<User>>();


var app = builder.Build();
InitializeProgram(app);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
async Task InitializeProgram(WebApplication web)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var initializeUser = scope.ServiceProvider.GetService<IInitializeUsers>();
        if(initializeUser != null)
        {
            await initializeUser.createUsers();
        }
        

    }
}