function bubbleSort(arr) {
    let steps = [];
    let sortedArray = [...arr];
    let n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                steps.push([...sortedArray]); // Store step for animation
            }
        }
    }
    return steps;
}

function quickSort(arr) {
    let steps = [];
    function quick(arr, low, high) {
        if (low < high) {
            let pivotIndex = partition(arr, low, high);
            steps.push([...arr]);
            quick(arr, low, pivotIndex - 1);
            quick(arr, pivotIndex + 1, high);
        }
    }
    
    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push([...arr]);
                i++;
            }
        }
        [arr[i], arr[high]] = [arr[high], arr[i]];
        return i;
    }

    let sortedArray = [...arr];
    quick(sortedArray, 0, sortedArray.length - 1);
    return steps;
}

function insertionSort(arr) {
    let steps = [];
    let sortedArray = [...arr];

    for (let i = 1; i < sortedArray.length; i++) {
        let key = sortedArray[i];
        let j = i - 1;
        while (j >= 0 && sortedArray[j] > key) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
            steps.push([...sortedArray]); // Store step
        }
        sortedArray[j + 1] = key;
        steps.push([...sortedArray]);
    }
    return steps;
}

function selectionSort(arr) {
    let steps = [];
    let sortedArray = [...arr];

    for (let i = 0; i < sortedArray.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < sortedArray.length; j++) {
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
            }
        }
        [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        steps.push([...sortedArray]); // Store step
    }
    return steps;
}

function mergeSort(arr) {
    let steps = [];
    function merge(arr, left, mid, right) {
        let leftArr = arr.slice(left, mid + 1);
        let rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i++];
            } else {
                arr[k] = rightArr[j++];
            }
            steps.push([...arr]);
            k++;
        }

        while (i < leftArr.length) {
            arr[k++] = leftArr[i++];
            steps.push([...arr]);
        }
        while (j < rightArr.length) {
            arr[k++] = rightArr[j++];
            steps.push([...arr]);
        }
    }

    function mergeSortHelper(arr, left, right) {
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            mergeSortHelper(arr, left, mid);
            mergeSortHelper(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    let sortedArray = [...arr];
    mergeSortHelper(sortedArray, 0, sortedArray.length - 1);
    return steps;
}

module.exports = { 
    bubble: bubbleSort, 
    quick: quickSort, 
    insertion: insertionSort, 
    selection: selectionSort, 
    merge: mergeSort 
};
