import { validateUploadFile } from './server/utils/uploadValidator.js';

console.log('Testing validateUploadFile with regular errors...\n');

// Test 1: No file provided
try {
  validateUploadFile(undefined);
  console.log('❌ Test 1 FAILED: Should have thrown an error');
} catch (error) {
  console.log('✅ Test 1 PASSED: No file error -', error.message);
}

// Test 2: File without filename
try {
  validateUploadFile({ data: Buffer.from('test'), type: 'image/png' });
  console.log('❌ Test 2 FAILED: Should have thrown an error');
} catch (error) {
  console.log('✅ Test 2 PASSED: No filename error -', error.message);
}

// Test 3: File exceeds size limit
try {
  const largeData = Buffer.alloc(10 * 1024 * 1024); // 10MB
  validateUploadFile({ data: largeData, filename: 'large.png', type: 'image/png' }, { maxFileSize: 5 * 1024 * 1024 });
  console.log('❌ Test 3 FAILED: Should have thrown an error');
} catch (error) {
  console.log('✅ Test 3 PASSED: File size error -', error.message);
}

// Test 4: Invalid file type
try {
  validateUploadFile({ data: Buffer.from('test'), filename: 'test.gif', type: 'image/gif' });
  console.log('❌ Test 4 FAILED: Should have thrown an error');
} catch (error) {
  console.log('✅ Test 4 PASSED: Invalid type error -', error.message);
}

// Test 5: Valid file (should not throw)
try {
  validateUploadFile({ data: Buffer.from('test'), filename: 'test.png', type: 'image/png' });
  console.log('✅ Test 5 PASSED: Valid file accepted');
} catch (error) {
  console.log('❌ Test 5 FAILED: Should not have thrown an error -', error.message);
}

console.log('\nAll tests completed!');