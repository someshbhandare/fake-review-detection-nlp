from pathlib import Path
import string, nltk
from nltk.corpus import stopwords
import pickle

class CustomUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if name == 'text_process':
            return text_process
        return super().find_class(module, name)


# load model
def load_model(model_path: Path):
    with open(model_path, 'rb') as file:
        model = CustomUnpickler(file).load()
    return model

# text_process
def text_process(review):
    nopunc = [char for char in review if char not in string.punctuation]
    nopunc = ''.join(nopunc)
    return [word for word in nopunc.split() if word.lower() not in stopwords.words('english')]