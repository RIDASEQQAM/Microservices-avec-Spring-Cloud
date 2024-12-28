@echo off
echo Testing Microservices API

echo.
echo === Test du Service Produit ===
echo.

echo 1. Création d'un produit
curl -X POST http://localhost:8080/api/produits -H "Content-Type: application/json" -d "{\"nom\":\"Ordinateur Portable\",\"description\":\"Laptop haute performance\",\"prix\":999.99,\"stock\":50}"

echo.
echo 2. Lecture du produit créé
curl -X GET http://localhost:8080/api/produits/1

echo.
echo 3. Mise à jour du produit
curl -X PUT http://localhost:8080/api/produits/1 -H "Content-Type: application/json" -d "{\"nom\":\"Ordinateur Portable Pro\",\"description\":\"Laptop haute performance pour professionnels\",\"prix\":1299.99,\"stock\":45}"

echo.
echo === Test du Service Commande ===
echo.

echo 4. Création d'une commande
curl -X POST http://localhost:8080/api/commandes -H "Content-Type: application/json" -d "{\"description\":\"Commande urgente\",\"quantite\":2,\"montant\":2599.98,\"idProduit\":1}"

echo.
echo 5. Lecture de la commande créée
curl -X GET http://localhost:8080/api/commandes/1

echo.
echo 6. Lecture des commandes récentes
curl -X GET http://localhost:8080/api/commandes/recent

echo.
echo 7. Mise à jour de la commande
curl -X PUT http://localhost:8080/api/commandes/1 -H "Content-Type: application/json" -d "{\"description\":\"Commande urgente modifiée\",\"quantite\":3,\"montant\":3899.97,\"idProduit\":1}"

echo.
echo === Test des endpoints Actuator ===
echo.

echo 8. Vérification de la santé du service commandes
curl -X GET http://localhost:8081/actuator/health

echo.
echo 9. Vérification de la santé du service produits
curl -X GET http://localhost:8082/actuator/health

echo.
echo === Test du Circuit Breaker ===
echo.

echo 10. Test du fallback (arrêtez le service produit pour voir le comportement de secours)
curl -X GET http://localhost:8080/api/commandes/1

echo.
pause
