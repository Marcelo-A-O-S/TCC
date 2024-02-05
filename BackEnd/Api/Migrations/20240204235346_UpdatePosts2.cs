using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class UpdatePosts2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_posts_users_User",
                table: "posts");

            migrationBuilder.DropIndex(
                name: "IX_posts_User",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "User",
                table: "posts");

            migrationBuilder.CreateIndex(
                name: "IX_posts_userId",
                table: "posts",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_posts_users_userId",
                table: "posts",
                column: "userId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_posts_users_userId",
                table: "posts");

            migrationBuilder.DropIndex(
                name: "IX_posts_userId",
                table: "posts");

            migrationBuilder.AddColumn<int>(
                name: "User",
                table: "posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_posts_User",
                table: "posts",
                column: "User");

            migrationBuilder.AddForeignKey(
                name: "FK_posts_users_User",
                table: "posts",
                column: "User",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
