using FluentAssertions;
using let___namespace___;

namespace UnitTest;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        Class1.HelloWorld().Should().Be("Hello World");
    }
}
