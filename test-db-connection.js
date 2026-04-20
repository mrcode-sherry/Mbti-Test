// Test MongoDB Connection
import mongoose from "mongoose";

const testConnection = async () => {
  try {
    console.log("🔄 Testing MongoDB Atlas connection...");
    
    const uri = "mongodb+srv://hassamytchannel77_db_user:SsPWPNjqelVyo1qI@aptitude-counsel-cluste.kbj6frp.mongodb.net/aptitudeDB?retryWrites=true&w=majority";
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ Database Connected Successfully!");
    console.log("📊 Connection State:", mongoose.connection.readyState);
    console.log("🏷️  Database Name:", mongoose.connection.name);
    console.log("🌐 Host:", mongoose.connection.host);
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', TestSchema);
    
    const testDoc = new TestModel({
      message: "Atlas connection test successful!"
    });
    
    await testDoc.save();
    console.log("✅ Test document created successfully!");
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log("🧹 Test document cleaned up");
    
    await mongoose.disconnect();
    console.log("🔌 Disconnected from database");
    console.log("\n🎉 Your MongoDB Atlas database is ready to use!");
    
  } catch (error) {
    console.error("❌ Database Connection Error:");
    console.error("Error Message:", error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log("\n💡 Authentication Error - Check:");
      console.log("1. Username: hassamytchannel77_db_user");
      console.log("2. Password: SsPWPNjqelVyo1qI");
      console.log("3. Database user permissions in Atlas");
    } else if (error.message.includes('network')) {
      console.log("\n💡 Network Error - Check:");
      console.log("1. Internet connection");
      console.log("2. Network access settings in Atlas (allow your IP)");
      console.log("3. Firewall settings");
    }
    
    process.exit(1);
  }
};

testConnection();