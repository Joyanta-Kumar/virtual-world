#include <stdio.h>


int main()
{
  int num = 2;
  int result = 0;
  for (int i = 1; i < num; i++) {
    result += i;
  }

  printf("\n\e[1;32m%d\e[0m\n", result);
  return 0;
}