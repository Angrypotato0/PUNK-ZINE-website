import unittest
from hello import some_function

class TestHello(unittest.TestCase):
    def test_some_function(self):
        self.assertEqual(some_function(), 'expected_output')

if __name__ == '__main__':
    unittest.main()