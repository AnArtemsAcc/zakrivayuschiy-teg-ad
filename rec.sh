#!/bin/bash

# Функция для вывода содержимого файла
print_file() {
    local file="$1"
    echo "=== FILE: $file ==="
    echo "--- CONTENT START ---"
    if file "$file" | grep -q text; then
        cat "$file"
    else
        echo "[BINARY FILE - content omitted]"
    fi
    echo "--- CONTENT END ---"
    echo
}

# Рекурсивный обход с исключением нескольких директорий
find . -type f \
    -not -path "*/.git/*" \
    -not -path "*/node_modules/*" \
    -not -path "*/__pycache__/*" \
    -not -path "*/\.*" \
    -not -path "*.sln" \
    -not -path "*.json" \
    ! -name "$(basename "$0")" | while read -r file; do
    print_file "$file"
done
