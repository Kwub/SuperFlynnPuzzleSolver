import json
import urllib.request

url = "http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b"
response = urllib.request.urlopen(url)
print(response)

