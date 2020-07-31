---
layout: post
title:  "Spring-06 Proxy Pattern"
description: 
date:   2020-07-31
categories: Spring AOP Proxy
---
Static and Dynamic Proxy

- a pic to illustrate Proxy Pattern

![Proxy](/image/spring/Proxy.jpg)

## 1. Interface : Rent

```java
public interface Rent {
    void rentHouse();
}
```

## 2. Static Proxy

```java
// static proxy
public class HouseAgency implements Rent{

    private Rent rent;

    public HouseAgency() { }

    public HouseAgency (Rent rent) {
        this.rent = rent;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }

    @Override
    public void rentHouse() {
        System.out.println("Now agency takes over...");
        showHouse();
        rent.rentHouse();
        signContract();
        System.out.println("Now agency ends...");
    }

    public void showHouse() {
        System.out.println("Show house to client");
    }

    public void signContract () {
        System.out.println("Sign a contract");
    }
}
```

3. Dynamic Proxy

```java
public class RentHandler implements InvocationHandler {

    private Object proxied;

    public void setProxied(Object proxied) {
        this.proxied = proxied;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        showHouse();
        method.invoke(proxied, args);
        signContract();

        return null;
    }

    public void showHouse() {
        System.out.println("Show house to client");
    }

    public void signContract () {
        System.out.println("Sign a contract");
    }

    public Object getProxy () {
        return Proxy.newProxyInstance(
                Rent.class.getClassLoader(),
                new Class[] {Rent.class},
                this
        );
    }
}
```

4. Test.class

```java
@Test
public void staticProxy () {

    Client client = new Client();

    Rent houseOwner = new HouseOwner();

    Rent agency = new HouseAgency(houseOwner);

    agency.rentHouse();
}

@Test
public void dynamicProxy () {

    Rent houseOwner = new HouseOwner();

    RentHandler rentHandler = new RentHandler();

    rentHandler.setProxied(houseOwner);

    Rent proxy = (Rent) rentHandler.getProxy();

    proxy.rentHouse();
}
```



Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)