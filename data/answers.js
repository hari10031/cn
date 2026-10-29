export const answersData = {
    'q1': {
        filename: 'perceptron_logic_gates.ipynb',
        code: `import numpy as np

X = np.array([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
])

y = np.array([0, 1, 1, 1])

def step(z):
    return 1 if z >= 0 else 0

def perceptron(X, y, learning_rate=0.1, epochs=1000):
    X_mod = np.insert(X, 0, 1, axis=1)
    weights = np.ones(X_mod.shape[1])

    for _ in range(epochs):
        for i in range(len(X)):
            prediction = step(np.dot(X_mod[i], weights))
            weights += learning_rate * (y[i] - prediction) * X_mod[i]

    bias = weights[0]
    w = weights[1:]
    return bias, w

bias, weights = perceptron(X, y)

predictions = []
for sample in X:
    pred = step(np.dot(sample, weights) + bias)
    predictions.append(pred)

predictions = np.array(predictions)

accuracy = np.mean(predictions == y) * 100

print("Bias:", bias)
print("Weights:", weights)
print("Predictions:", predictions)
print("Accuracy:", accuracy, "%")`,
        output: `Bias: -0.09999999999999987
Weights: [1. 1.]
Predictions: [0 1 1 1]
Accuracy: 100.0 %`,
        plots: [
            {
                id: 'q1_decision_boundary',
                title: 'Perceptron Decision Boundary (OR Gate)',
                type: 'perceptron_boundary',
                description: 'Linear separation boundary separating class 0 (0,0) from class 1 (0,1; 1,0; 1,1) with bias -0.1 and weights [1.0, 1.0].'
            }
        ]
    },

    'q2': {
        filename: 'ann_keras_sequential_xor.ipynb',
        code: `import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

X = np.array([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
])

y = np.array([
    [0],
    [1],
    [1],
    [0]
])

model = Sequential()
model.add(Dense(6, activation='relu', input_dim=2))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

history = model.fit(X, y, epochs=1000, verbose=0)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], color='red', label='Loss')
plt.title('Loss vs Epochs')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], color='blue', label='Accuracy')
plt.title('Accuracy vs Epochs')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()

plt.show()

predictions = model.predict(X)
predictions = (predictions > 0.5).astype(int)

print("Predicted XOR outputs:\\n", predictions)`,
        output: `1/1 [==============================] - 0s 54ms/step
Predicted XOR outputs:
 [[0]
 [1]
 [1]
 [0]]`,
        plots: [
            {
                id: 'q2_ann_curves',
                title: 'Matplotlib Visual Output: Loss & Accuracy vs Epochs',
                type: 'ann_training_curves',
                description: 'Dual subplot visual showing loss converging towards 0.01 (left) and training accuracy reaching 100% (right) across 1000 epochs.'
            }
        ]
    },

    'q3': {
        filename: 'cnn_mnist_fc_layer.ipynb',
        code: `import tensorflow as tf
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt
import numpy as np

(x_train, y_train), (x_test, y_test) = datasets.fashion_mnist.load_data()

print("Training data shape:", x_train.shape)
print("Testing data shape:", x_test.shape)
print("Unique labels:", np.unique(y_train))

class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

plt.figure(figsize=(8, 4))
for i in range(5):
    plt.subplot(1, 5, i + 1)
    plt.imshow(x_train[i], cmap='gray')
    plt.title(class_names[y_train[i]])
    plt.axis('off')
plt.show()

x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)

y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

print("After reshaping:", x_train.shape)

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.summary()

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    x_train, y_train,
    epochs=5,
    validation_data=(x_test, y_test)
)

test_loss, test_acc = model.evaluate(x_test, y_test)
print("\\nTest Accuracy:", test_acc)

plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Training vs Validation Accuracy')
plt.show()`,
        output: `Training data shape: (60000, 28, 28)
Testing data shape: (10000, 28, 28)
Unique labels: [0 1 2 3 4 5 6 7 8 9]
After reshaping: (60000, 28, 28, 1)
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 conv2d (Conv2D)             (None, 26, 26, 32)        320       
                                                                 
 max_pooling2d (MaxPooling2  (None, 13, 13, 32)        0         
 D)                                                              
                                                                 
 flatten (Flatten)           (None, 5408)              0         
                                                                 
 dense (Dense)               (None, 128)               692352    
                                                                 
 dense_1 (Dense)             (None, 10)                1290      
                                                                 
=================================================================
Total params: 693,962
Trainable params: 693,962
Non-trainable params: 0
_________________________________________________________________
Epoch 1/5
1875/1875 [==============================] - 20s 10ms/step - loss: 0.3982 - accuracy: 0.8576 - val_loss: 0.3241 - val_accuracy: 0.8831
Epoch 2/5
1875/1875 [==============================] - 19s 10ms/step - loss: 0.2678 - accuracy: 0.9025 - val_loss: 0.2814 - val_accuracy: 0.8982
Epoch 3/5
1875/1875 [==============================] - 19s 10ms/step - loss: 0.2215 - accuracy: 0.9192 - val_loss: 0.2612 - val_accuracy: 0.9056
Epoch 4/5
1875/1875 [==============================] - 19s 10ms/step - loss: 0.1884 - accuracy: 0.9304 - val_loss: 0.2589 - val_accuracy: 0.9084
Epoch 5/5
1875/1875 [==============================] - 19s 10ms/step - loss: 0.1593 - accuracy: 0.9412 - val_loss: 0.2541 - val_accuracy: 0.9125
313/313 [==============================] - 1s 4ms/step - loss: 0.2541 - accuracy: 0.9125

Test Accuracy: 0.9125000238418579`,
        plots: [
            {
                id: 'q3_dataset_samples',
                title: 'Fashion-MNIST Sample Image Inspection (plt.imshow)',
                type: 'fashion_mnist_preview',
                description: 'First 5 training instances displayed in grayscale: Ankle boot, T-shirt/top, T-shirt/top, Dress, T-shirt/top.'
            },
            {
                id: 'q3_training_accuracy',
                title: 'Training vs Validation Accuracy (5 Epochs)',
                type: 'cnn_accuracy_plot',
                description: 'Comparison of training accuracy (reaching 94.1%) vs validation accuracy (reaching 91.2%).'
            }
        ]
    },

    'q4': {
        filename: 'deep_cnn_adam_optimizer.ipynb',
        code: `import tensorflow as tf
from tensorflow.keras import datasets, layers, models
from tensorflow.keras.optimizers import Adam
import numpy as np
import matplotlib.pyplot as plt

(x_train, y_train), (x_test, y_test) = datasets.fashion_mnist.load_data()

print("Original Training Data Shape:", x_train.shape)
print("Original Testing Data Shape:", x_test.shape)

x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

x_train = x_train.reshape(-1, 28, 28, 1)
x_test = x_test.reshape(-1, 28, 28, 1)

y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

print("Processed Training Data Shape:", x_train.shape)
print("Processed Testing Data Shape:", x_test.shape)

model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.summary()

learning_rate = 0.001

model.compile(
    optimizer=Adam(learning_rate=learning_rate),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

batch_size = 32
epochs = 5

history = model.fit(
    x_train,
    y_train,
    batch_size=batch_size,
    epochs=epochs,
    validation_data=(x_test, y_test)
)

test_loss, test_acc = model.evaluate(x_test, y_test)
print("\\nTest Accuracy:", test_acc)

plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.title("Accuracy vs Epochs")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.title("Loss vs Epochs")
plt.legend()

plt.show()`,
        output: `Original Training Data Shape: (60000, 28, 28)
Original Testing Data Shape: (10000, 28, 28)
Processed Training Data Shape: (60000, 28, 28, 1)
Processed Testing Data Shape: (10000, 28, 28, 1)
Model: "sequential_1"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 conv2d_1 (Conv2D)           (None, 26, 26, 32)        320       
                                                                 
 max_pooling2d_1 (MaxPooling (None, 13, 13, 32)        0         
 2D)                                                             
                                                                 
 conv2d_2 (Conv2D)           (None, 11, 11, 64)        18496     
                                                                 
 max_pooling2d_2 (MaxPooling (None, 5, 5, 64)          0         
 2D)                                                             
                                                                 
 flatten_1 (Flatten)         (None, 1600)              0         
                                                                 
 dense_2 (Dense)             (None, 128)               204928    
                                                                 
 dense_3 (Dense)             (None, 10)                1290      
                                                                 
=================================================================
Total params: 225,034
Trainable params: 225,034
Non-trainable params: 0
_________________________________________________________________
Epoch 1/5
1875/1875 [==============================] - 24s 13ms/step - loss: 0.4485 - accuracy: 0.8368 - val_loss: 0.3421 - val_accuracy: 0.8752
Epoch 2/5
1875/1875 [==============================] - 23s 12ms/step - loss: 0.2974 - accuracy: 0.8912 - val_loss: 0.2845 - val_accuracy: 0.8964
Epoch 3/5
1875/1875 [==============================] - 24s 13ms/step - loss: 0.2513 - accuracy: 0.9081 - val_loss: 0.2678 - val_accuracy: 0.9021
Epoch 4/5
1875/1875 [==============================] - 23s 12ms/step - loss: 0.2201 - accuracy: 0.9195 - val_loss: 0.2534 - val_accuracy: 0.9085
Epoch 5/5
1875/1875 [==============================] - 23s 12ms/step - loss: 0.1942 - accuracy: 0.9276 - val_loss: 0.2468 - val_accuracy: 0.9130
313/313 [==============================] - 2s 5ms/step - loss: 0.2468 - accuracy: 0.9130

Test Accuracy: 0.9129999876022339`,
        plots: [
            {
                id: 'q4_deep_cnn_curves',
                title: 'Matplotlib Dual Evaluation: Accuracy & Loss vs Epochs',
                type: 'deep_cnn_curves',
                description: 'Side-by-side subplots displaying Training & Validation Accuracy (left) alongside Training & Validation Loss (right) across 5 Epochs.'
            }
        ]
    }
};

// Compatibility aliases
answersData['1'] = answersData['q1'];
answersData['2'] = answersData['q2'];
answersData['3'] = answersData['q3'];
answersData['4'] = answersData['q4'];
answersData['1a'] = answersData['q1'];
