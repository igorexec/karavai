import {loadImage} from '../image'

describe('[Service] Image', () => {
  describe('loadImage()', () => {
    test('returns promise object', () => {
      const actual = loadImage('image-url')
      expect(actual).toBeInstanceOf(Promise)
    })
  })
})
