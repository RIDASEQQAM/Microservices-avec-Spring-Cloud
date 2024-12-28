@echo off
echo Building Eureka Server...
cd eureka-server
call mvn clean package -DskipTests
cd ..

echo Building Microservice Produit...
cd microservice-produit
call mvn clean package -DskipTests
cd ..

echo Building Microservice Commandes...
cd microservice-commandes
call mvn clean package -DskipTests
cd ..

echo Building API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

echo All projects built successfully!
pause
