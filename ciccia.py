import pandas as pd

# Define function to parse the markdown content
def parse_markdown_to_dict(md_content):
    lines = md_content.split("\n")
    data = {"Category": [], "REFold": [], "REFnew": [], "Name": [], "HT Unit Price": [], "Unit": [],"HT Price": [], "Total Price": []}
    category = ""
    refold = ""
    refnew = ""
    name = ""
    ht_price = ""

    for line in lines:
        line = line.strip()
        if line.startswith("#"):
            category = line.strip("# ").strip()
            data["Category"].append(category)
            data["REFold"].append('')
            data["REFnew"].append('')
            data["Name"].append('')
            data["HT Unit Price"].append('')
            data["Unit"].append('')
            data["HT Price"].append('')
            data["Total Price"].append(f"=SUM(F{len(data['Category'])+1}:F{len(data['Category'])+1})")
        elif line:
            if line.startswith("90-") or line.startswith("31-") or line.startswith("19-"):
                refold = line
            elif line.startswith("PF") or line.startswith("CP") or line.startswith("SF") or line.startswith("NG") or line.startswith("LG"):
                refnew = line
            elif line.replace(".", "", 1).replace(",", "", 1).isdigit():
                if ht_price == '':
                    ht_price = line.replace(".", "").replace(",", ".")
                else: 
                    ht_price = ''
                # append current parsed data to the dictionary
                if name != '':
                    data["Category"].append('')
                    data["REFold"].append(refold)
                    data["REFnew"].append(refnew)
                    data["Name"].append(name)
                    data["HT Unit Price"].append(ht_price)
                    data["Unit"].append(0)
                    data["HT Price"].append(f"=E{len(data['Category'])+1}*F{len(data['Category'])+1}")
                    data["Total Price"].append('')
                    # reset name for the next item
                name = ""
                refold = ''
                refnew = ''
                ht_price = ''
            else:
                if name:
                    name += " " + line
                else:
                    name = line
    print(data["Category"])
    catLength = []
    catcat = 0
    for cat in data["Category"]:
        
        if cat != '':
            catLength.append(catcat)
            catcat = 0
        elif cat == '':
            catcat += 1
    catLength.append(catcat)
    catLength = catLength[1:]
    count = 0
    for x in range(len(data["Category"])):
        if data["Category"][x] != '':
            print(count,"   ", catLength)
            data["Total Price"][x] = (f"=SUM(G{x+3}:G{catLength[count]+x+2})")
            count += 1
    print(catLength)
    return data

# Read the content of the markdown file
file_path_md = "ciccia.md"
with open(file_path_md, 'r') as file:
    md_content = file.read()

# Parse the markdown content to dictionary
parsed_data = parse_markdown_to_dict(md_content)

# Create a DataFrame from the parsed data
df = pd.DataFrame(parsed_data)

# Save the DataFrame to an Excel file
file_path_final = "client_quotes_structured_from_md.xlsx"
df.to_excel(file_path_final, index=False)