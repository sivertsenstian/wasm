#[no_mangle]
pub fn greet() -> String {
    return "Hello from rust!".to_string();
}

#[no_mangle]
pub fn inc(a: i32) -> i32 {
    return a + 1;
}

#[no_mangle]
pub fn dec(a: i32) -> i32 {
    return a - 1;
}
