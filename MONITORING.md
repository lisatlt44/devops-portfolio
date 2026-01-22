# Guide de Monitoring : Grafana Cloud + OpenTelemetry + Faro

Ce document détaille la configuration du monitoring "Fullstack" de l'application Portfolio.
L'architecture utilise **OpenTelemetry** pour le backend (Server Side) et **Grafana Faro** pour le frontend (Client Side).

## 1. Prérequis Grafana Cloud

Vous devez avoir un compte Grafana Cloud et une Stack active.
Rendez-vous sur [grafana.com] et connectez-vous à votre portail.

## 2. Configuration Backend (OpenTelemetry)

Le backend utilise le protocole OTLP via HTTP pour envoyer les traces.

### Récupérer les identifiants
1. Dans votre portail Grafana Cloud, cliquez sur **"Details"** dans la carte de votre stack.
2. Cherchez la section **OpenTelemetry** (ou Tempo).
3. Notez les informations suivantes :
    *   **URL endpoint** (ex: `https://otlp-gateway-prod-eu-west-0.grafana.net/otlp`)
    *   **Instance ID / User** (ex: `123456`)
    *   **API Token / Password** (Vous devrez peut-être en générer un nouveau dans "Security" > "Access Policies" avec les droits "metrics:write" et "traces:write").

### Générer le Header d'Authentification
L'authentification utilise le format "Basic Auth" encodé en Base64.
Format : `InstanceID:ApiToken`

**Commande Linux/Mac :**
```bash
echo -n "INSTANCE_ID:API_TOKEN" | base64
```

**Site web utile :** [base64encode.org](https://www.base64encode.org/) (format `User:Password`).

Le résultat (ex: `MTIzNDU6YWJjZGVm...`) sera utilisé dans la variable `OTEL_EXPORTER_OTLP_HEADERS`.

## 3. Configuration Frontend (Grafana Faro)

Le frontend utilise le Web SDK Faro pour capturer les erreurs JS, les Web Vitals et les sessions.

### Créer l'application dans Grafana
1. Ouvrez votre instance Grafana.
2. Dans le menu de gauche, allez dans **Frontend** (sous "Apps" ou "Observability").
3. Cliquez sur **Create Application**.
4. Renseignez un nom (ex: `Portfolio Prod`).
5. Dans l'étape de configuration, repérez les informations du script :
    *   `url` : L'URL du collecteur (ex: `https://faro-collector-prod-eu-west-0.grafana.net/collect/...`)
    *   `app.id` : L'identifiant unique de l'application.

## 4. Variables d'Environnement

Configurez ces variables dans votre fichier `.env` local ou dans les réglages de votre hébergeur (Vercel, Docker, etc.).

### 🖥️ Backend (OpenTelemetry)

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `OTEL_SERVICE_NAME` | Nom du service dans Grafana | `portfolio-api` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | URL complète pour les **Traces** (ajouter `/v1/traces`) | `https://otlp-gateway-...grafana.net/otlp/v1/traces` |
| `OTEL_EXPORTER_OTLP_HEADERS` | Header Authorization | `Authorization=Basic <VOTRE_BASE64>` |

> **Attention :** Pour `OTEL_EXPORTER_OTLP_ENDPOINT`, assurez-vous d'ajouter `/v1/traces` à la fin de l'URL de base fournie par Grafana si vous utilisez l'exportateur HTTP traces.

### 🌐 Frontend (Faro)

| Variable | Description | Exemple |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_FARO_URI` | URL du collecteur Faro | `https://faro-collector-...grafana.net/collect/...` |
| `NEXT_PUBLIC_FARO_APP_ID` | ID de l'application Faro | `votre_app_id` |

## 5. Vérification

1. Lancez l'application : `npm run dev` (ou build/start).
2. Naviguez sur quelques pages pour générer du trafic.
3. Vérifiez les logs serveurs :
    ```
    OpenTelemetry started for service: portfolio-api
    ```
4. Dans Grafana :
    *   **Frontend** : Allez dans la section "Frontend", cliquez sur votre app. Vous devriez voir des sessions actives.
    *   **Backend** : Allez dans "Explore", choisissez la source de données **Tempo** (ou Traces). Filtrez par `Service Name = portfolio-api`.

## 6. Structure du Code

*   `src/instrumentation.ts` : Active le monitoring au démarrage de Next.js (serveur).
*   `src/otel.ts` : Configuration du SDK Node.js OpenTelemetry.
*   `src/components/FaroSetup.tsx` : Initialisation du SDK Faro (client).
*   `src/app/layout.tsx` : Injection du composant Faro.
