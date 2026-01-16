# 1. Configuración del Proveedor (AWS)
provider "aws" {
  region = "us-east-1" # Virginia del Norte (Estándar)
}

# 2. Grupo de Seguridad (El "Firewall")
# Esto permite que entremos por SSH y que la gente vea la web (HTTP)
resource "aws_security_group" "mr_teo_sg" {
  name        = "mr-teo-security-group"
  description = "Permitir trafico web y SSH"

  # Entrada: SSH (Solo para ti)
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # En producción, cambia esto por tu IP
  }

  # Entrada: Web (Frontend - Puerto 80)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Entrada: Backend (API - Puerto 3001)
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Salida: Todo permitido (para descargar actualizaciones)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. La Instancia EC2 (El Servidor Virtual)
resource "aws_instance" "mr_teo_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (Gratis)
  instance_type = "t2.micro"              # Capa Gratuita

  # Vinculamos el firewall que creamos arriba
  vpc_security_group_ids = [aws_security_group.mr_teo_sg.id]

  tags = {
    Name    = "MrTeo-Server-MVP"
    Project = "IDAT_M06_PY"
  }

  # Script de inicio (User Data) - Instala Docker automáticamente al encender
  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io docker-compose
              systemctl start docker
              systemctl enable docker
              EOF
}
