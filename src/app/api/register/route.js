import { cookies } from 'next/headers'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import validator from 'email-validator'

export async function GET (req, res) {
  console.log("in the api page")

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  // Validate email
  if (!validator.validate(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  // Hash password
  const saltRounds = 10
  const hash = bcrypt.hashSync(pass, saltRounds)

  try {
    const url = 'your-mongodb-connection-string'
    const client = new MongoClient(url)
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db('app')
    const collection = db.collection('login')

    // Check if user already exists
    const userExists = await collection.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Insert new user
    await collection.insertOne({ email, password: hash })
    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error connecting to database:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
