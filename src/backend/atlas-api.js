// Atlas Data API Connection (Alternative to MongoDB driver)
const ATLAS_DATA_API_URL = "https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1";
const ATLAS_API_KEY = process.env.ATLAS_API_KEY;
const CLUSTER_NAME = "Aptitude-Counsel-Database";
const DATABASE_NAME = "aptitudeDB";

class AtlasAPI {
  constructor() {
    this.baseURL = ATLAS_DATA_API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'api-key': ATLAS_API_KEY
    };
  }

  async findOne(collection, filter = {}) {
    const response = await fetch(`${this.baseURL}/action/findOne`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        collection,
        database: DATABASE_NAME,
        dataSource: CLUSTER_NAME,
        filter
      })
    });
    return response.json();
  }

  async insertOne(collection, document) {
    const response = await fetch(`${this.baseURL}/action/insertOne`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        collection,
        database: DATABASE_NAME,
        dataSource: CLUSTER_NAME,
        document
      })
    });
    return response.json();
  }

  async updateOne(collection, filter, update) {
    const response = await fetch(`${this.baseURL}/action/updateOne`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        collection,
        database: DATABASE_NAME,
        dataSource: CLUSTER_NAME,
        filter,
        update
      })
    });
    return response.json();
  }

  async find(collection, filter = {}) {
    const response = await fetch(`${this.baseURL}/action/find`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        collection,
        database: DATABASE_NAME,
        dataSource: CLUSTER_NAME,
        filter
      })
    });
    return response.json();
  }
}

export default new AtlasAPI();