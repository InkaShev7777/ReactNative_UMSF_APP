using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace umsfAPI.Managers
{
    public static class EncryptionManager
    {
        private static byte[] Key = { };
        private static byte[] IV = { };

        public static void Encrypt(string input)
        {
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                des.GenerateKey();
                des.GenerateIV();
                byte[] key = des.Key;
                byte[] iv = des.IV;
                Key = des.Key;
                IV = des.IV;

                using (FileStream inputFile = new FileStream("input.txt", FileMode.Create))
                {
                    byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                    inputFile.Write(inputBytes, 0, inputBytes.Length);
                }

                using (FileStream outputFile = new FileStream("close.txt", FileMode.Create))
                using (CryptoStream cryptoStream = new CryptoStream(outputFile, des.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    byte[] inputBytes = Encoding.UTF8.GetBytes(input);
                    cryptoStream.Write(inputBytes, 0, inputBytes.Length);
                }
            }
        }

        public static void Decrypt()
        {
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                des.Key = Key;
                des.IV = IV;

                using (FileStream inputFile = new FileStream("close.txt", FileMode.Open))
                using (FileStream outputFile = new FileStream("out.txt", FileMode.Create))
                {
                    ICryptoTransform decryptor = des.CreateDecryptor();
                    using (CryptoStream cryptoStream = new CryptoStream(inputFile, decryptor, CryptoStreamMode.Read))
                    {
                        cryptoStream.CopyTo(outputFile);
                    }
                }
            }
        }
        public static string GetCloseData()
        {
            if (File.Exists("close.txt"))
            {
                var lines = File.ReadAllLines("close.txt");
                string returnData = "";
                foreach (var line in lines)
                {
                    returnData += line + "\n";
                }
                return returnData;
            }
            else
            {
                return "File is empty!";
            }
        }
        public static string GetOutData()
        {
            if (File.Exists("out.txt"))
            {
                var lines = File.ReadAllLines("out.txt");
                string returnData = "";
                foreach (var line in lines)
                {
                    returnData += line + "\n";
                }
                return returnData;
            }
            else
            {
                return "File is empty!";
            }
        }
    }
}
