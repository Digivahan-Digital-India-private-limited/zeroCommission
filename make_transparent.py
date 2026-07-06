from PIL import Image
import sys

def process(file_path):
    try:
        img = Image.open(file_path).convert("RGBA")
        data = img.getdata()
        new_data = []
        
        # We take the top-left pixel as the background color reference
        bg_color = data[0]
        
        for item in data:
            # Distance in RGB space
            dist = ((item[0]-bg_color[0])**2 + (item[1]-bg_color[1])**2 + (item[2]-bg_color[2])**2)**0.5
            # If the pixel is very close to the background color, make it transparent
            if dist < 45: # tolerance
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(file_path, "PNG")
        print("Processed:", file_path)
    except Exception as e:
        print("Error on", file_path, ":", e)

process("src/assets/Screenshot 2026-07-06 134433.png") # GST
process("src/assets/Screenshot 2026-07-06 134503.png") # FD
process("src/assets/Screenshot 2026-07-06 134518.png") # SIP
process("src/assets/Screenshot 2026-07-06 134535.png") # RD
print("Done")
