
## Delivery Order Price Calculator

### Technical Details
- **Language**: TypeScript (Node.js)
- **Framework**: Express
- **Dependencies**: Axios, Node-Cache
- **Build Tool**: TypeScript Compiler (`tsc`)

### Run Locally
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Tests**:
   ```bash
   npm run test
   ```

3. **Build and Start**:
   ```bash
   npm run build
   npm start
   ```

4. **API Endpoint**:
   ```
   GET /api/v1/delivery-order-price
   Query Parameters:
     - venue_slug (string, required)
     - cart_value (number, required)
     - user_lat (number, required)
     - user_lon (number, required)
   ```

---

### Run with Docker
1. **Build and Run**:
   ```bash
   docker build -t delivery-app .
   docker run -p 8000:8000 --env-file .env delivery-app
   ```

2. **Run with Docker Compose (Recommended)**:
   ```bash
   docker-compose up --build
   ```