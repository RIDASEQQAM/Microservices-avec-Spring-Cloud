# Exemples d'utilisation de l'API

Ce document fournit des exemples détaillés pour tester l'API des microservices.

## Service Produit

### 1. Créer un nouveau produit
```bash
curl -X POST http://localhost:8080/api/produits \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Ordinateur Portable",
    "description": "Laptop haute performance",
    "prix": 999.99,
    "stock": 50
  }'
```

### 2. Obtenir un produit
```bash
curl -X GET http://localhost:8080/api/produits/1
```

### 3. Mettre à jour un produit
```bash
curl -X PUT http://localhost:8080/api/produits/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Ordinateur Portable Pro",
    "description": "Laptop haute performance pour professionnels",
    "prix": 1299.99,
    "stock": 45
  }'
```

### 4. Supprimer un produit
```bash
curl -X DELETE http://localhost:8080/api/produits/1
```

## Service Commande

### 1. Créer une nouvelle commande
```bash
curl -X POST http://localhost:8080/api/commandes \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Commande urgente",
    "quantite": 2,
    "montant": 2599.98,
    "idProduit": 1
  }'
```

### 2. Obtenir une commande
```bash
curl -X GET http://localhost:8080/api/commandes/1
```

### 3. Obtenir les commandes récentes
```bash
curl -X GET http://localhost:8080/api/commandes/recent
```

### 4. Mettre à jour une commande
```bash
curl -X PUT http://localhost:8080/api/commandes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Commande urgente modifiée",
    "quantite": 3,
    "montant": 3899.97,
    "idProduit": 1
  }'
```

### 5. Supprimer une commande
```bash
curl -X DELETE http://localhost:8080/api/commandes/1
```

## Endpoints Actuator

### 1. Vérifier la santé des services
```bash
# Service Commandes
curl -X GET http://localhost:8081/actuator/health

# Service Produits
curl -X GET http://localhost:8082/actuator/health
```

### 2. Rafraîchir la configuration
```bash
curl -X POST http://localhost:8081/actuator/refresh
```

## Test du Circuit Breaker

Pour tester le circuit breaker Hystrix :

1. Créez d'abord quelques produits et commandes
2. Arrêtez le service produit :
   ```bash
   docker-compose stop microservice-produit
   ```
3. Essayez d'accéder à une commande :
   ```bash
   curl -X GET http://localhost:8080/api/commandes/1
   ```
   Vous devriez voir les informations de fallback pour le produit

4. Redémarrez le service produit :
   ```bash
   docker-compose start microservice-produit
   ```

## Réponses attendues

### Produit
```json
{
    "id": 1,
    "nom": "Ordinateur Portable",
    "description": "Laptop haute performance",
    "prix": 999.99,
    "stock": 50
}
```

### Commande
```json
{
    "id": 1,
    "description": "Commande urgente",
    "quantite": 2,
    "date": "2024-12-25",
    "montant": 2599.98,
    "idProduit": 1
}
```

### Santé du service
```json
{
    "status": "UP",
    "details": {
        "message": "Des commandes sont présentes dans la base"
    }
}
```
