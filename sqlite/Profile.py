import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('Profile.db')

# Create a cursor object using the cursor method
cursor = conn.cursor()

# Create table
cursor.execute('''CREATE TABLE IF NOT EXISTS Profile
(id INTEGER PRIMARY KEY, bio TEXT, age INTEGER)''')

# Inserting data
profile = [
  (1, 'deezzz nuts', 30),
  (2, 'fart nuts', 10),
  (3, 'yourz nuts', 20),
]

# Insert multiple records in a single query
cursor.executemany('INSERT INTO Profile VALUES (?, ?, ?)', profile)

# Commit the changes
conn.commit()

# Querying data
cursor.execute('SELECT * FROM Profile')
results = cursor.fetchall()

for item in results:
  print(item)

## This updates stuff, we dont need atm
# cursor.execute('UPDATE Profile SET bio = ? WHERE id = ?', ('i am farting', 1))

## Commit the changes
# conn.commit()

## Delete a user
# cursor.execute('DELETE FROM Profile WHERE id = ?', (1,))

## Commit the changes
# conn.commit()

# Close the database connection
conn.close()