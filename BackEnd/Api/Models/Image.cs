using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string Path { get; set; }
        public string Description { get; set; }

        public async Task CreateImage(string image)
        {
            string filePath = "";
            try
            {
                string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
                string PathImages = currentDirectory.Replace(@"\bin\Debug\net6.0", "") + @"\images";
                if (!Directory.Exists(PathImages))
                {
                    Directory.CreateDirectory(PathImages);
                }
                var imageBytes = Convert.FromBase64String(image.Replace("data:image/png;base64,", ""));
                if(this.Description.Length > 15)
                {
                    filePath = @$"{PathImages}\{this.Description.Substring(0,14)}-{new Guid()}-{this.Id}.png";
                }
                else
                {
                    filePath = @$"{PathImages}\{this.Description}-{new Guid()}-{this.Id}.png";
                }
                
                try
                {
                    if (!File.Exists(filePath))
                    {
                        File.WriteAllBytes(filePath, imageBytes);
                    }
                    // Salvar os bytes da imagem em um arquivo
                    
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro ao salvar a imagem: " + ex.Message);
                }
                this.Path = filePath;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
