import resize from '../../utilities/resize';
import fs from 'fs';
import path from 'path';

// unit test for resize function
describe('Tests resize asynchronus function', () => {
  const targetPath = path.join(__dirname, '../../../thumb/');

  it('Detects non existing source images', async () => {
    // Arrange
    const filename = 'non-existing-image',
      width = '1000',
      height = '1000';
    // Act
    const obj = await resize(filename, width, height);
    // Assert
    expect(obj).toEqual({ created: 0, path: 'none' });
  });
  it("Creates thumb -distenation folder- if it doens't exist", async () => {
    // Arrange
    fs.rmSync(targetPath, { recursive: true, force: true }); // remove foldler
    const filename = 'fjord',
      width = '1000',
      height = '1000';
    // Act
    await resize(filename, width, height);
    // Assert
    expect(fs.existsSync(targetPath)).toEqual(true);
  });
  it('Creates new resized image', async () => {
    // Arrange
    const filename = 'fjord',
      width = '1038',
      height = '1083';
    const targetImage = `${filename}_${width}_${height}.jpg`;
    // Act
    const obj = await resize(filename, width, height);
    // Assert
    expect(obj).toEqual({ created: 1, path: targetPath + targetImage });
  });
  it('Retrieves previously cashed image', async () => {
    // Arrange
    const filename = 'fjord',
      width = '1038',
      height = '1083';
    const targetImage = `${filename}_${width}_${height}.jpg`;
    // Act
    const obj = await resize(filename, width, height);
    // Assert
    expect(obj).toEqual({ created: 2, path: targetPath + targetImage });
  });
  it('Returns undefined if any parameter is not valid', async () => {
    // Arrange
    const filename = 'fjord',
      width = '1038',
      height = 'hello';
    // Act
    const obj = await resize(filename, width, height);
    // Assert
    expect(obj).toEqual(undefined);
  });
});
