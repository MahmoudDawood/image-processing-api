import fs, {promises as fsPromise} from 'fs'
import path from 'path'
import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe("Testing all endpoints", async() => {

  beforeAll(async function () {
    await fsPromise.mkdir((path.join(__dirname, '../../thumb')))
  })
  afterAll(function () {
    fs.rmSync(path.join(__dirname, '../../thumb'), { recursive: true, force: true })
  })

  it("Runs server entry point", async() => {
    // Arrange
    // Act
    const response = await request.get('/')
    // Assert
    // console.log(response)
    expect(response.text).toBe('Welcome to image processing API')
    expect(response.status).toBe(200)
  })
  it("Runs api endpoint", async() => {
    // Arrange
    // Act
    const response = await request.get('/api')
    // Assert
    expect(response.text).toBe('Routing station')
    expect(response.status).toBe(200)
  })

  it("Creates resized image", async() => {
    // Arrange
    const url = "/api/images?filename=fjord&width=1000&height=1000"
    // Act
    const response = await request.get(url)
    // Assert
    expect(response.status).toBe(201)
  })
  it("Retrieves previously cached image", async() => {
    // Arrange
    const url = "/api/images?filename=fjord&width=1000&height=1000"
    // Act
    const response = await request.get(url)
    // Assert
    expect(response.status).toBe(200)
  })
  
  it("Requires all params with acceptable values", async() => {
    // Arrange
    const url = "/api/images?filename=fjord" // missing params
    const url2 = "/api/images?filename=fjord&width=1000&height=hello" // wrong param value
    // Act
    const response = await request.get(url)
    const response2 = await request.get(url2)
    // Assert
    expect(response.text).toBe('Please re-check your parameters.')
    expect(response.status).toBe(400)

    expect(response2.text).toBe('Please re-check your parameters.')
    expect(response2.status).toBe(400)
  })
  it("Requires all params to have truthy values", async() => {
    // Arrange
    const url = "/api/images?filename=fjord&width=1000&height" // missing hight value
    const url2 = "/api/images?filename=&width&height=1000" // missing height and name
    // Act
    const response = await request.get(url)
    const response2 = await request.get(url2)
    // Assert
    expect(response.text).toBe('height parameter is required to resize')
    expect(response.status).toBe(400)

    expect(response2.text).toBe('filename parameter is required to resize')
    expect(response2.status).toBe(400)
  })
  it("Requires an existent image name", async() => {
    // Arrange
    const url = "/api/images?filename=non-existent-img&width=10&height=10" // non existent img
    // Act
    const response = await request.get(url)
    // Assert
    expect(response.text).toBe('Specified image not found')
    expect(response.status).toBe(404)
  })
})