export const questionsData = [
  {
    id: 'q1',
    number: '1',
    shortTitle: 'Perceptron Learning (OR Gate)',
    title: '1. Implementation of Perceptron Learning Algorithm for Logic Gates (OR, AND, and NOT)',
    fullName: '1. Implementation of Perceptron Learning Algorithm for Logic Gates (OR, AND, and NOT)',
    category: 'Perceptron & Linear Classification',
    description: 'Implementation of the single-layer Perceptron learning algorithm from scratch using NumPy to train on logic gates (OR gate). Uses a step activation function and iterative weight adjustments with learning rate 0.1 over 1000 epochs.'
  },
  {
    id: 'q2',
    number: '2',
    shortTitle: 'ANN Classification (Keras Sequential)',
    title: '2. Classification using Artificial Neural Networks (Sequential model of Keras)',
    fullName: '2. Classification using Artificial Neural Networks (Sequential model of Keras)',
    category: 'Artificial Neural Networks (ANN)',
    description: 'Implementation of an Artificial Neural Network using Keras Sequential model with Dense layers (6 neurons, 8 neurons, and 1 output neuron with ReLU and Sigmoid activations) to learn the non-linear XOR gate. Includes Loss vs. Epochs and Accuracy vs. Epochs visualization plots.'
  },
  {
    id: 'q3',
    number: '3',
    shortTitle: 'CNN Model with FC Layer (MNIST)',
    title: '3. Image classification on CNN model with Fully connected layer (MNIST dataset)',
    fullName: '3. Image classification on CNN model with Fully connected layer (MNIST dataset)',
    category: 'Convolutional Neural Networks (CNN)',
    description: 'Implementation of a Convolutional Neural Network (CNN) with Conv2D, MaxPooling2D, Flatten, and Fully Connected Dense layers on the Fashion-MNIST dataset. Displays sample dataset images and evaluates model performance with Training vs. Validation Accuracy plots over 5 epochs.'
  },
  {
    id: 'q4',
    number: '4',
    shortTitle: 'Deep CNN with Adam Optimizer',
    title: '4. Deep CNN with Multiple Convolutional Layers and Adam Optimizer',
    fullName: '4. Deep CNN with Multiple Convolutional Layers and Adam Optimizer (Fashion-MNIST)',
    category: 'Deep CNN Architectures & Optimization',
    description: 'Implementation of a Deep Convolutional Neural Network with multiple Conv2D (32 and 64 filters) and MaxPooling2D layers trained using the Adam optimizer with a custom learning rate (0.001) and categorical cross-entropy loss. Generates dual subplots for Accuracy vs. Epochs and Loss vs. Epochs.'
  }
];

// Compatibility alias for code expecting algorithmsData
export const algorithmsData = questionsData;
