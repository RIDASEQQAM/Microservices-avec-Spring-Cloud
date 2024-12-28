# Spring Microservices Demo

This project demonstrates a microservices architecture using Spring Cloud, implementing an order management system with the following components:

## Architecture Components

- Config Server: Centralized configuration management
- Eureka Server: Service discovery
- API Gateway: Single entry point for all services
- Orders Microservice: Handles order management
- Product Microservice: Manages product information

## Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- Git

## Project Structure

```
spring-microservices-demo/
├── config-server/         # Spring Cloud Config Server
├── eureka-server/        # Service Discovery Server
├── api-gateway/          # Spring Cloud Gateway
├── microservice-commandes/ # Orders Microservice
└── microservice-produit/  # Product Microservice
```

## Features

### Case Study 1
- CRUD operations for Orders
- Spring Cloud Config integration
- Custom configuration for last N days orders
- Actuator health monitoring
- Custom health indicators

### Case Study 2
- Extended Order entity with product reference
- Service Discovery with Eureka
- API Gateway implementation
- Circuit Breaker pattern with Hystrix

## Getting Started

1. Start the Config Server
2. Start the Eureka Server
3. Start both microservices
4. Start the API Gateway

## Development Team

- [Rida Seqqam](https://github.com/ridaseqqam) - Lead Developer
- [Younes Ammari](https://github.com/YounesAmmari) - Developer

## Additional Information

For detailed setup and configuration instructions, please refer to each module's individual README.
