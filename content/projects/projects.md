# MonoBlog

A personal blog system built on ABP Framework and .NET Core, using MongoDB for data storage and Redis for caching. The
project follows a microservice architecture with a clear separation between frontend and backend. The API follows
RESTful principles, and the frontend is developed using Blazor. This project demonstrates an excellent .NET Core
application that can serve as a learning resource.

## Features

- 📝 Blog post management with categories and tags
- 👥 User authentication and authorization with multiple OAuth providers (GitHub, Gitee, Alipay, DingTalk, Microsoft,
  Weibo, QQ)
- 💬 Comment/Message system
- 🔍 Advanced search functionality
- 🔄 Background task processing with Hangfire
- 🌞 Light/Dark theme mode
- 🔒 JWT authentication for API protection
- 📈 Hot news/topics integration
- ✍️ Digital signature functionality
- 🌤️ Weather information integration

## Technologies

- 🔷 .NET Core / C# - Core platform and language
- 🏗️ ABP - Modular application framework
- 🔶 Blazor - Web UI framework
- 🗄️ MongoDB - Database for storing content
- 🚀 Redis - Caching service
- 🔌 Hangfire - Background task processing
- 🔐 JWT - API authentication
- 📊 Swagger - API documentation
- 🐳 Docker - Containerization support
- 🧪 Health Checks - System monitoring
- 📝 Markdown - Content formatting
- 📝 Vditor - Markdown editor
- 🖼️ ImageSharp - Image processing
- 🧵 YamlDotNet - YAML configuration support
- 📜 Serilog - Logging framework

---

# JSON Converter Tool

A web-based API service that enables users to convert between various data formats (JSON, XML, YAML) and generate
programming language code (C#, Java) from JSON data. The tool simplifies the transformation of structured data between
formats and automatically generates class definitions for application development.

## Features

- 🔄 **Convert between data formats:**
    - JSON to XML conversion
    - JSON to YAML conversion
    - XML to JSON conversion
    - YAML to JSON conversion
- 💻 **Generate code from JSON:**
    - Generate C# classes with customizable options
    - Generate Java classes with customizable options
- ⚙️ **Customization options:**
    - Control property naming conventions (PascalCase)
    - Toggle JSON serialization attributes
    - Set custom root class names
    - Choose between fields and properties
- 📚 **API documentation with Swagger UI**
- 🔒 **CORS support for web applications**

## Technologies

- 🔷 **.NET 9.0 (ASP.NET Core)**
- 🌐 **RESTful API architecture**
- 📦 **Newtonsoft.Json for JSON processing**
- 📑 **YamlDotNet for YAML conversion**
- 📘 **Swagger/OpenAPI for API documentation**
- 🧪 **HTTP testing support**
