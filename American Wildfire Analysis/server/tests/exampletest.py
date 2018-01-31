import unittest

def exampleTest(x):
    return x

class ExampleTest(unittest.TestCase):
    def test(self):
        self.assertEqual(exampleTest(1), 1)

if __name__ == '__main__':
    unittest.main()
