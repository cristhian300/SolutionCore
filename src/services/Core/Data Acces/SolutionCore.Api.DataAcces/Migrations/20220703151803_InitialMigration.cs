using Microsoft.EntityFrameworkCore.Migrations;

namespace SolutionCore.Api.DataAcces.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credencial",
                table: "Usuario");

            migrationBuilder.DropColumn(
                name: "Rol",
                table: "Usuario");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Credencial",
                table: "Usuario",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rol",
                table: "Usuario",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }
    }
}
