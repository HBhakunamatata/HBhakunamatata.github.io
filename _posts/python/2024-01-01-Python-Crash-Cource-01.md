---
layout: post
title: "Python Crash Cource Part01 Basic"
description: 
date: 2024-01-01
categories: Python
---

## 1 数据表示方式

### 1.1 String

1. 大小写

    - title()
    - upper()
    - lower()

2. 删除空白

    - strip()
    - lstrip()
    - rstrip()

### 1.2 List(有顺序，可修改) Tuple(有顺序，不能改)

1. CRUD (以list为例)

    - list.append(item) / list.insert(index, item)
    - list.pop(i) / list.remove(item) / del list[i]
    - list[-1]

2. 排序

    - 永久排序 list.sort() / list.sort(reverse=True)
    - 临时排序 sorted(list) / sorted(list, reverse=True) / reverse(list)

3. 切片和复制

    - 切片 split = list[0:3] ==> $x\in[0,3)$
    - 复制 copy_list = list[:]

4. 列表解析

    - 数值列表  list(range(1, 6)) ==> $x\in[1,6)$
    - list = (x**2 for x in range(1, 6))  ==>  list=${\{ x^2|x\in[1,6) }\}$

5. 内置方法

    - min(list) / max(list) / average(list)
    - 判断元素是否存在于list中 
    > if item in list:
    - 判断列表list是否为空
    > if list:

### 1.3 Dict

1. CRUD

    - dict['key'] = value
    - dict.pop('key') / del dict['key'] 

2. 遍历


```python
for key, value in dict.items():
    print(str(key) + " : " + str(value))

for value in dict.keys():
    print(str(value))

for key in dict.values():
    print(str(key))
```

## 2. 逻辑组织


## 3. 代码组织

### 3.1 函数

```python
def function_name(param1, param2=default_value, *args, **kwargs):
    function_body
```

1. 参数：位置实参 ｜ 关键字实参 ｜ 默认值实参 ｜ 列表（防止修改原值） ｜ 任意长度实参数
2. 返回值： 多个返回值


### 3.2 类

1. 创建类和初始化对象

```python
class Car():
"""一次模拟汽车的简单尝试"""
    def __init__(self, make, model, year):
    """初始化描述汽车的属性"""
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0
    
    def get_descriptive_name(self):
    """返回整洁的描述性信息"""
        long_name = str(self.year) + ' ' + self.make + ' ' + self.model
        return long_name.title()

    def increment_odometer(self, miles):
        """将里程表读数增加指定的量"""
        self.odometer_reading += miles

# 初始化实例
my_new_car = Car('audi', 'a4', 2016)
print(my_new_car.get_descriptive_name())

```

2. 继承

```python
class ElectricCar(Car):
    """电车"""
    def __init__(self, make, model, year):
        super().__init__(make, model, year)
        self.battery_size = 70

    def describe_battery(self):
    """打印一条描述电瓶容量的消息"""
        print("This car has a " + str(self.battery_size) + "-kWh battery.")
    
my_tesla = ElectricCar('tesla', 'model s', 2016)
print(my_tesla.get_description_name())
```

## 3.3 导入代码块

```python
# 每个.py文件都是一个python模块，使用文件名作为模块名使用文件中的函数和类
import pymodel
pymodel.function()

# 可以从模块中只导入指定的函数，这样可以直接使用函数
from poymodel import function
function()

# 针对类，设置也是一样的
import car
from car import Car, ElectricCar
from car import *
```


## 4.测试代码

### 4.1 测试函数

```python
# name_function.py
def get_formatted_name(first, last):
"""Generate a neatly formatted full name."""
full_name = first + ' ' + last
return full_name.title()

# names.py
from name_function import get_formatted_name

print("Enter 'q' at any time to quit.")
while True:
first = input("\nPlease give me a first name: ")
if first == 'q':
break
last = input("Please give me a last name: ")
if last == 'q':
break
formatted_name = get_formatted_name(first, last)
print("\tNeatly formatted name: " + formatted_name + '.')

# test_name_ function.py
import unittest
from name_function import get_formatted_name

class NameTestCase(unittest.TestCase):
    """测试name_function"""
    
    def test_first_last_name(self):
        formatted_name = get_formatted_name('janis', 'joplin')
        self.assertEqual(formatted_name, 'Janis Joplin')
    
unittest.main()
```

### 4.2 测试类

```python
# survey.py
class AnonymousSurvey():
"""收集匿名调查问卷的答案"""
    
    def __init__(self, question):
    """存储一个问题，并为存储答案做准备"""
        self.question = question
        self.responses = []
    
    def show_question(self):
    """显示调查问卷"""
        print(question)
    
    def store_response(self, new_response):
    """存储单份调查答卷"""
        self.responses.append(new_response)
    
    def show_results(self):
    """显示收集到的所有答卷"""
        print("Survey results:")
        for response in responses:
            print('- ' + response)

# test_survey.py
import unittest
from survey import AnonymousSurvey

class TestAnonymousSurvey(unittest.TestCase):

    def testResponseStore(self):
        question = "What language did you first learn to speak?"
        my_survey = AnonymousSurvey(question)
        my_survey.store_response('English')
        self.assertIn('English', my_survey.responses)

unittest.main()
```

