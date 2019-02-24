extern crate wasm_bindgen;
extern crate web_sys;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    return format!("Hello from rust, {}", name);
}

#[wasm_bindgen]
pub fn inc(a: i32) -> i32 {
    return a + 1;
}

#[wasm_bindgen]
pub fn dec(a: i32) -> i32 {
    return a - 1;
}

#[wasm_bindgen]
pub fn red_alert(name: &str) -> () {
    alert(name);  
}
